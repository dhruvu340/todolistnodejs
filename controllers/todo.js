const Todo=require("../models/todo")

const gettodo=async(req,res)=>{
    try {
        const todos=await Todo.find().sort({createdAt:-1});

        res.json(todos);
        
    } catch (error) {
        res.status(404).json({msg:"error while loading todos"})
    }
}

const posttodo=async(req,res)=>{
    try {
        const {title,description}=req.body;
        if(!title||!description){return res.status(400).json({msg:"add complete fields"})}
        const newtodo=new Todo({title,description,});

        await newtodo.save();

        res.status(201).json(newtodo);

        
    } catch (error) {
        res.status(404).json({msg:"error while adding todos"})
    }
}


const deletetodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo deleted successfully", deleted: todo });
  } catch (error) {
    res.status(500).json({ msg: "Error while deleting todo", error: error.message });
  }
};



const updatetodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const user=await Todo.findByIdAndUpdate(id,{ $set: req.body },{new:true,runValidators:true});
        if(!user){return res.status(404).json({msg:"todo not found"})}
        res.status(200).json(user);
    } catch (error) {
         res.status(500).json({ msg: "Error while updating todo", error: error.message });
    }
}

module.exports = { gettodo, posttodo, deletetodo, updatetodo };