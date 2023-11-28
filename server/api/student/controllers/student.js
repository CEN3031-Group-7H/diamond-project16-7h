'use strict'

const {sanitizeEntity} = require("strapi-utils/lib")

module.exports = {

    async me(ctx) {

        // get the student that is currently logged in
        const {ids, session} = ctx.state.user
        const students = await strapi.services.student.find({ id: ids}, ["badges",])

        // return the students and the current session
        return {
            session,
            students: students.map(student => sanitizeEntity(student, {model: strapi.models.student}))
        }
    },
    /**
     * Add hidden badge list to studentProfile json field of student
     * Will let legacy students be updated to have this data
     *
     * @return {Student}
     */
     async granthidebadgearr(ctx) {

        // get the student that is currently logged in
        const {ids, session} = ctx.state.user
        const students = await strapi.services.student.find({ id: ids}, ["badges",])

        // ensure request was not sent as formdata
        if (ctx.is('multipart')) return ctx.badRequest(
            'Multipart requests are not accepted!',
            {id: 'Student.hidebadge.format.invalid', error: 'ValidationError'}
        )

        // ensure the request has the right number of params
        const params = Object.keys(ctx.request.body).length
        if (params !== 0) return ctx.badRequest(
            'Invalid number of params!',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        // find student
        const {id} = ctx.params
        let student = await strapi.services.student.findOne({id: id})
        if (!student) return ctx.notFound(
            'The student id provided does not correspond to a valid student!',
            {id: 'Student.enrolled.id.invalid', error: 'ValidationError'}
        )
        if (!ids.find((logged_in_id)=>logged_in_id==id)) return ctx.badRequest(
            'Cannot edit profile data without logging in as student',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        //Check nullity of profileData
        if(student.profileData == null) student.profileData = {hiddenBadges:[]};
        //Check existence of hiddenBadges 
        if(student.profileData.hiddenBadges == null) student.profileData.hiddenBadges = [];
        console.log('added missing fields')
        console.log(student);

        // remove private fields and return the new student
        const updatedStudent = await strapi.services.student.update({id: id}, student)
        return sanitizeEntity(updatedStudent, {model: strapi.models.student})
    },
    /**
     * Add badge to hidden badge list for currently logged in student
     *
     * @param {string} badgeId
     *
     * @return {Student}
     */
    async hidebadge(ctx) {

        // get the student that is currently logged in
        const {ids, session} = ctx.state.user
        const students = await strapi.services.student.find({ id: ids}, ["badges",])
        console.log(ctx);

        // ensure request was not sent as formdata
        if (ctx.is('multipart')) return ctx.badRequest(
            'Multipart requests are not accepted!',
            {id: 'Student.hidebadge.format.invalid', error: 'ValidationError'}
        )

        // ensure the request has the right number of params
        const params = Object.keys(ctx.request.body).length
        if (params !== 1) return ctx.badRequest(
            'Invalid number of params!',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        // validate the request
        const {badgeId} = ctx.request.body
        if (typeof badgeId !== typeof(2)) return ctx.badRequest(
            'An badge ID must be provided!',
            {id: 'Student.hidemybadge.body.invalid', error: 'ValidationError'}
        )

        // find student
        const {id} = ctx.params
        let student = await strapi.services.student.findOne({id: id})
        if (!student) return ctx.notFound(
            'The student id provided does not correspond to a valid student!',
            {id: 'Student.enrolled.id.invalid', error: 'ValidationError'}
        )
        if (!ids.find((logged_in_id)=>logged_in_id==id)) return ctx.badRequest(
            'Cannot edit profile data without logging in as student',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        //Check existence of hiddenBadges 
        if(student.profileData.hiddenBadges == null) student.profileData.hiddenBadges = [];


        //hide only if not already hidden
        else if(student.profileData.hiddenBadges.indexOf(badgeId) == -1)
            student.profileData.hiddenBadges.push(ctx.request.body.badgeId)

        // remove private fields and return the new student
        const updatedStudent = await strapi.services.student.update({id: id}, student)
        return sanitizeEntity(updatedStudent, {model: strapi.models.student})
    },
    /**
     * Remove badge from hidden badge list for currently logged in student
     *
     * @param {string} badgeId
     *
     * @return {Student}
     */
     async showbadge(ctx) {

        // get the student that is currently logged in
        const {ids, session} = ctx.state.user
        const students = await strapi.services.student.find({ id: ids}, ["badges",])

        // ensure request was not sent as formdata
        if (ctx.is('multipart')) return ctx.badRequest(
            'Multipart requests are not accepted!',
            {id: 'Student.hidebadge.format.invalid', error: 'ValidationError'}
        )

        // ensure the request has the right number of params
        const params = Object.keys(ctx.request.body).length
        if (params !== 1) return ctx.badRequest(
            'Invalid number of params!',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        // validate the request
        const {badgeId} = ctx.request.body
        if (typeof badgeId !== typeof(2)) return ctx.badRequest(
            'An badge ID must be provided!',
            {id: 'Student.hidemybadge.body.invalid', error: 'ValidationError'}
        )

        // find student
        const {id} = ctx.params
        let student = await strapi.services.student.findOne({id: id})
        if (!student) return ctx.notFound(
            'The student id provided does not correspond to a valid student!',
            {id: 'Student.enrolled.id.invalid', error: 'ValidationError'}
        )
        if (!ids.find((logged_in_id)=>logged_in_id==id)) return ctx.badRequest(
            'Cannot edit profile data without logging in as student',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
        )

        //Check existence of hiddenBadges 
        if(student.profileData.hiddenBadges == null) {
            'Badge not already hidden',
            {id: 'Student.hidebadge.body.invalid', error: 'ValidationError'}
            student.profileData.hiddenBadges = [];
        }

        // remove private fields and return the new student
        student.profileData.hiddenBadges = student.profileData.hiddenBadges.filter(e => e != badgeId);
        const updatedStudent = await strapi.services.student.update({id: id}, student)
        return sanitizeEntity(updatedStudent, {model: strapi.models.student})
    },
    /**
     * Update student enrolled attribute
     *
     * @param {Boolean} enrolled
     *
     * @return {Student}
     */
    async enrolled(ctx) {

        // ensure request was not sent as formdata
        if (ctx.is('multipart')) return ctx.badRequest(
            'Multipart requests are not accepted!',
            {id: 'Student.enrolled.format.invalid', error: 'ValidationError'}
        )

        // ensure the request has the right number of params
        const params = Object.keys(ctx.request.body).length
        if (params !== 1) return ctx.badRequest(
            'Invalid number of params!',
            {id: 'Student.enrolled.body.invalid', error: 'ValidationError'}
        )

        // validate the request
        const {enrolled} = ctx.request.body
        if (typeof enrolled !== "boolean") return ctx.badRequest(
            'An enrollment status must be provided!',
            {id: 'Student.enrolled.body.invalid', error: 'ValidationError'}
        )

        // find student
        const {id} = ctx.params
        let student = await strapi.services.student.findOne({id: id})
        if (!student) return ctx.notFound(
            'The student id provided does not correspond to a valid student!',
            {id: 'Student.enrolled.id.invalid', error: 'ValidationError'}
        )


        // remove private fields and return the new student
        student.enrolled = ctx.request.body.enrolled
        const updatedStudent = await strapi.services.student.update({id: id}, student)
        return sanitizeEntity(updatedStudent, {model: strapi.models.student})
    },

    async create(ctx) {
        const {students, classroom} = ctx.request.body

        if (students) {
            return await Promise.all(students.map(student => {
                // validate the request
                if (typeof student.name !== "string" || !student.name) return ctx.badRequest(
                    'A name must be provided!',
                    {id: 'Student.create.body.invalid', error: 'ValidationError'}
                )

                return strapi.services.student.create({
                    name: student.name,
                    character: student.character,
                    classroom: classroom
                })
            }))
        }

        // validate the request
        const {name} = ctx.request.body
        if (typeof name !== "string" || !name) return ctx.badRequest(
            'A name must be provided!',
            {id: 'Student.create.body.invalid', error: 'ValidationError'}
        )

        return strapi.services.student.create(ctx.request.body)
    }
}
