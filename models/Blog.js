const mongoose = require('mongoose')

// start creating a schema that allows us to have a data model

const blogPostSchema = new mongoose.Schema({
    // we have data model here
    // look at all the different types of data that I need to store

        title: {
          type: String,
          required: true
        },
        slug: {           // NOTE: this is the only unique field for each blog
          type: String,
          required: true,
          unique: true    // For URLs like /blog/rust-ownership
        },
        publishDate: {
          type: Date,
          required: true
        },
        content: {
          type: {
            // TODO: use js or llm to summarize or pick the first 40 words of a blog post and put it in summary.
            summary: String,     // Short preview shown in blog list
            fullContent: String, // Complete blog post content
            contentType: {
              type: String,
              enum: ['markdown', 'html'],
              default: 'html'
            }
          },
          required: true
        },
        metadata: {
          isNew: {              // TODO: can use js to put a cut off date to automatically decide is new or not
            type: Boolean,
            default: false
          },
          likes: {
            type: Number,
            default: 0
          },
          views: {
            type: Number,
            default: 0
          }
        },
        // For organizing and filtering posts
        tags: [{
          type: String
        }],
        // Navigation references
        navigation: {
          previousPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost'
          },
          nextPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost'
          }
        },
        // Timestamps for post management
        timestamps: {
          created: {
            type: Date,
            default: Date.now
          },
          lastModified: {
            type: Date,
            default: Date.now
          }
        }

})


module.exports = mongoose.model('BlogPost', blogPostSchema)
