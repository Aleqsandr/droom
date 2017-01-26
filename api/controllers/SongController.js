/**
 * SongController.js
 *
 * @description :: Server-side logic for managing Songs.
 */

module.exports = {

  /**
   * SongController.create()
   */
  create: function (req, res) {
    return res.json({
      todo: 'song/create is not implemented yet!'
    });
  },

  /**
   * SongController.destroy()
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * SongController.update()
   */
  update: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },
  /**
   * SongController.find()
   */
  find: function (req, res) {
    var query = sails.models.song.find().exec(function(err, list){
      sails.log(list)
    });

    return res.json({
      query: query
    });
  },


};