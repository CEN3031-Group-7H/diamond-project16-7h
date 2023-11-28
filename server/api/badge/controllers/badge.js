'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  
    // This is the updateVisibility function.
    updateVisibility: async ctx => {
  
      const { id, visible } = ctx.request.body;
  
     
      const updatedBadge = await strapi.services.badge.update({ id }, { visible });
  
    
      return updatedBadge;
    },

    async create(ctx) {
        // Directly create a badge from the request body without validation or handling multiple badges
        try {
          // The create operation might still throw an error if there's something wrong with the data or the server
          const {name, description, criteria, image_url, classroom, students, default_visible} = ctx.request.body;
          const badge = await strapi.services.badge.create({
            name: name,
            description: description,
            image_url: image_url,
            classroom: classroom,
            criteria: criteria,
            default_visible: default_visible
          });
          return badge; // Return the newly created badge
        } catch (error) {
          // Log the error and return a server error message
          strapi.log.error('Failed to create badge', error);
          return ctx.internalServerError('Failed to store new badge.');
        }
      }
/*
    async create(ctx) {
      const {badge} = ctx.request.body

      if (badge) {
          return await Promise.all(badge.map(badge => {
              // validate the request
              if (typeof badge.name !== "string" || !badge.name) return ctx.badRequest(
                  'A name must be provided!',
                  {id: 'Badge.create.body.invalid', error: 'ValidationError'}
              )

              return strapi.services.badge.create({
                  name: badge.name,
                  description: badge.description,
                  criteria: badge.criteria,
                  image_url: badge.image_url
              })
          }))
      }

      // validate the request
      const {name} = ctx.request.body
      if (typeof name !== "string" || !name) return ctx.badRequest(
          'A name must be provided!',
          {id: 'Badge.create.body.invalid', error: 'ValidationError'}
      )

      return strapi.services.badge.create(ctx.request.body)
  }
  */
  };