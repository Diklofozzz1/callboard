import Connect from "../models/db_models.js"

export const ratingController = async (id) => {
    try {
        const allCommentToUser = await Connect.models.Comments.findAll({
            where: {
                linked_to_user: id
            }
        })

        let scoreSum = 0

        for (const item of allCommentToUser) {
            scoreSum += item.score
        }

        const newRating = scoreSum / allCommentToUser.length

        const user = await Connect.models.User.findOne({
            where: {
                id: id
            }
        })

        await user.update({
            rating: newRating
        })

    } catch (err) {
        return err
    }
}