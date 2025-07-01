exports.homeController=(req, res, next) => {
    console.log(`hello from Home-${req.url},${req.method}`);
    console.log(req.body)
    res.render('home',{title: 'Super Duper Home'});
}

exports.contactController=(req, res, next) => {
    console.log(`hello from Contact Us-${req.url},${req.method}`);
    res.render('contact-us', { title: 'Contact Us' });
    // This route handles GET requests to the '/contact-us' URL.
}