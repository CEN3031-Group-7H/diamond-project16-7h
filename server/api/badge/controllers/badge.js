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
  };