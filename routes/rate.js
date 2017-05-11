const express = require('express');
const router = express.Router();
const userData = require("../data/users");

router.get('/:id', (req, res) =>
{
    if (!req.user) //not logged in
        res.status(400).json({ error: "You must be logged in to leave a rating." });
    else
    {
        userData.getUserById(req.params.id).then((user) => 
        {
            res.render('rate', {user: user});
        }).catch(() => 
        {
            res.status(404).json({ error: "User not found" });
        });
    }
});

router.post('/:id', (req, res) =>
{
    let ratingData = req.body; 

   //todo error checking
    console.log(req.body);
    console.log(ratingData.cleanlyRating);
    console.log(req.params);

    console.log(req.user);
    console.log(req.user._id);
    console.log(req.user.userID);

    userData.addRatingToUser(req.params.id, req.user.userID, ratingData.cleanlyRating, ratingData.loudRating, 
        ratingData.annoyingRating, ratingData.friendlyRating, ratingData.considerateRating).then((updatedUserData) =>
        {
            res.redirect(`/users/${updatedUserData._id}`);
        }).catch((e) =>
        {
           res.status(500).json({ error: e }); 
        });
});

module.exports = router;