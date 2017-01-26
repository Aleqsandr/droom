/**
 * AppController.js
 *
 * @description :: Server-side logic for managing the App.
 */

module.exports = {
  index: function (req, res) {

    var bundle;

    if (sails.config.environment === 'production') {
      bundle = require('../../assets.json').main.js;
      console.log(bundle);
    }

    /*return res.json({
      todo: 'Not implemented yet!'
    });*/

    return res.view('index', {
      bundle: bundle,
    });
  },
};
