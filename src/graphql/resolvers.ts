import NewsService from '../services/NewsService';

const resolvers = {

    newsList: async () => await NewsService.get(),

    newsGetById: async (args) => {
        return await NewsService.getById(args.id);
    },

    addNews: async (args) => {
        //console.log(args.input.active);
        return await NewsService.create(args.input);
    },

    deleteNews: async(args) => {
        return await NewsService.delete(args.id);
    },

    updateNews: async (args) => {
        return await NewsService.update(args.input._id, args.input);
    }

};

export default resolvers;