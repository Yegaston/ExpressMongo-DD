const router = require('express').Router();
const Note = require('../models/Note');


router.get("/notes/add", (req, res, next) => {
    res.render("notes/new-note");
})

router.post('/notes/new-note', async (req, res, next) => {
    console.log(req.body);
    const { title, description } = req.body;

    const errors = [];

    if(!title){
        errors.push({text: '¨title empty!.'});
    }
    if(!description){
        errors.push({text: 'Description empty.'});
    }

    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({title, description});
        console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'note add succesfully');
        res.redirect('/notes');
    }

})

router.get('/notes', async (req, res, next) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', {notes});

});

router.get('/notes/edit/:id', async (req, res, next) =>{
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', async (req, res, next) =>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    req.flash('success_msg', 'Note update succesfully')
    res.redirect('/notes');
});

router.delete('/notes/delete-note/:id', async (req, res, next) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted succesfully')
    res.redirect('/notes');
})

module.exports = router;
