import NewsRepository from '../repository/NewsRepository';

class NewsService {

    async get(){
        return await NewsRepository.find({});
    };

    async getById(id){
        return await NewsRepository.findById(id);

    };

    async create(news) {
        return await NewsRepository.create(news);
    };

    async update(id, news) {
        return await NewsRepository.findByIdAndUpdate(id, news);
    };

    async delete(id) {
        return await NewsRepository.findByIdAndRemove(id);
    };
  
}

export default new NewsService();