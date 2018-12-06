const mongoose = require('mongoose');

mongoose.connect('mongodb://duki:rockst4r@ds121382.mlab.com:21382/sgt-project', {useNewUrlParser: true })
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));