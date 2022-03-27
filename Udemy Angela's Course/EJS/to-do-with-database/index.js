//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash"); 
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const myUrl = process.env['mongo_url'];
mongoose.connect( myUrl,
  { useNewURLParser: true }
);

const itemsSchema = { name: String };

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({ name: "Welcome to your todolist 1" });
const item2 = new Item({ name: "Welcome to your todolist 2" });
const item3 = new Item({ name: "Welcome to your todolist 3" });

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items:[itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({},function(err,foundItems){
    
      if(foundItems.length == 0)
      {
        Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved items to DB");
        }
        });

        res.redirect("/");
      }
      console.log(Object.values(foundItems));
      res.render("list", { listTitle: "Today",   listItems: 
                   foundItems});
    
  })
});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  
  const newItem = new Item({name: req.body.newItem});
 

  if(listName === "Today"){
    newItem.save();
    res.redirect("/")  
  }else{
    List.findOne({name:listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName)
    })
    
  }
  
});

app.post("/delete", function (req, res) {
  const checkedItemid = req.body.checkBox;
  const listName = req.body.listName;

  if(listName == "Today"){
    Item.findByIdAndRemove(checkedItemid , function (err) {
      if(err){
        console.log(err)
      }
      res.redirect("/")
    });   
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemid}}}, function(err, founcList){
      if(!err)
      {
        res.redirect("/"+listName);
      }
    })
  }
});

app.get("/:customListName", function (req, res) {
  
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name:customListName}, function (err, foundList) {
    if(!err){  
      if(!foundList){
          const list = new List({
          name:customListName,
          items:defaultItems
          });
          list.save();
        res.redirect("/" + customListName);
      }
      else{
        res.render("list", { listTitle: foundList.name,  listItems: foundList.items});
      }
    }   
  })
})

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
