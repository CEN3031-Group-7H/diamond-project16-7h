'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  
    // This is the updateVisibility function.
    /*
    updateVisibility: async ctx => {
  
      const { id, visible } = ctx.request.body;
  
     
      const updatedBadge = await strapi.services.badge.update({ id }, { visible });
  
    
      return updatedBadge;
    },
    */
  /**
     * Get a number representing the proportion of students to have earned the badge
     *
     *
     * @return {
   *  percentage
   *  message
   * } 
   *            Percentage of students in classroom have attained badge
   *            And message to display alongside    
   */
  async getPercentMessage(ctx) {

      // get the student that is currently logged in
      const {ids, session} = ctx.state.user
      const students = await strapi.services.student.find({ id: ids}, ["badges",])

      // ensure request was not sent as formdata
      if (ctx.is('multipart')) return ctx.badRequest(
          'Multipart requests are not accepted!',
          {id: 'Badge.getPercentMessage.format.invalid', error: 'ValidationError'}
      )

      // ensure the request has the right number of params
      const params = Object.keys(ctx.request.body).length
      if (params !== 0) return ctx.badRequest(
          'Invalid number of params!',
          {id: 'Badge.getPercentMessage.body.invalid', error: 'ValidationError'}
      )


      // find badge
      const {id} = ctx.params
      let badge = await strapi.services.badge.findOne({id: id})
      if (!badge) return ctx.notFound(
          'The badge id provided does not correspond to a valid badge!',
          {id: 'Badge.enrolled.id.invalid', error: 'ValidationError'}
      )
      // find classroom size
      const {classId} = badge.classroom;
      let classroomsize = await strapi.services.classroom.findSize({id: id})
      if (!classroomsize) return ctx.notFound(
          'The classroom id corresponding to the badge does not correspond to a valid classroom!',
          {id: 'Classroom.enrolled.id.invalid', error: 'ValidationError'}
      )

      
      if(classroomsize <= 1){
        percentage = -1,
        message = 'Uh oh! This badge is in an empty classroom!'
      }
      else if(badge.students.length == 0){
        percentage = 0,
        message = 'No students in this class have earned this badge yet'
      }
      else if(badge.students.length == 1){
        percentage = (int)(100 / classroomsize),
        message = 'Only one student has earned this badge!'
      }
      else{
        percentage = (int)(badge.students.length / classroomsize * 100)
        message = percentage + '% of students in your class have earned this badge'
      }
      return({percentage: percentage, message: message})
  },
};