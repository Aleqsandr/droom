// Song.js
// The set of songs registered in our app.

module.exports = {
  attributes: {
    
    id: {
      type: 'integer',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    artist: {
      type: 'string',
      required: true
    },

    year: {
      type: 'integer',
      required: true
    },

    difficulty: {
      type: 'integer',
      required: true
    }
  }
}

/*module.exports = {
  attributes: {
    
    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true
    }
  }
}*/