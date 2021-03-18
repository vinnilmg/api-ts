import NewsRepository from '../repository/NewsRepository';

class NewsService {

    async search( term, page, limit ) {
        console.log(page.type, limit.type);
        return await NewsRepository.find(
            { title: new RegExp('.*' + term + '*.', 'i' ) , active: true }, 
            'title hat active publishDate'
        ).sort({publishDate: -1 }).skip((page -1 * limit)).limit(10);
    }

    async get(){
        //filtros, propriedades para retorno
        return await NewsRepository.find({ active: true, hat : 'teste' }, 'title hat img publishDate'); 
    };

    async getById(_id){
        return await NewsRepository.findById(_id);

    };

    async create(news) {
        return await NewsRepository.create(news);
    };

    async update(_id, news) {
        return await NewsRepository.findByIdAndUpdate(_id, news);
    };

    async delete(_id) {
        return await NewsRepository.findByIdAndRemove(_id);
    };
  
}

export default new NewsService();