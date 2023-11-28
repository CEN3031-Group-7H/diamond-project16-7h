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

    /**
       * Get the number of students who have earned the badge corresponding to the id passed
       *
       *
       * @return {int}
       */
     async countEarners(ctx) {
    
      const { id } = ctx.params;
  
      // ensure request was not sent as formdata
      if (ctx.is('multipart')) return ctx.badRequest(
        'Multipart requests are not accepted!',
        {id: 'Badge.countearners.format.invalid', error: 'ValidationError'}
      )
  
      // ensure the request has the right number of params
      const params = Object.keys(ctx.request.body).length
      if (params !== 0) return ctx.badRequest(
          'Invalid number of params!',
          {id: 'Badge.countearners.body.invalid', error: 'ValidationError'}
      )
  
      // find badge
      const badge = await strapi.services.badge.findOne({id: id})
      if (!badge) return ctx.notFound(
          'The badge id provided does not correspond to a valid badge!',
          {id: 'Badge.countearners.id.invalid', error: 'ValidationError'}
      )
      
      return badge
      ? {count: badge.students.length}
      : badge;
    },

    async create(ctx) {
        // Directly create a badge from the request body without validation or handling multiple badges
        try {
          // The create operation might still throw an error if there's something wrong with the data or the server
          const badge = await strapi.services.badge.create(ctx.request.body);
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