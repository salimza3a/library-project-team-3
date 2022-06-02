let aboutBranch = database.ref('/about');

aboutBranch.on("value", function (snap) {
    console.log(snap.val());
});

