import NewsRepository from '../repository/NewsRepository';

class NewsService {

    async search( term, page, limit ) {
        //console.log(page.type, limit.type);
        return await NewsRepository.find({ title: new RegExp('.*' + term + '*.', 'i' ) , active: true }, 'title hat active publishDate')
        .sort({publishDate: -1 })
        .skip(((page -1) * limit))
        .limit(limit);
    }

    async get(){
        let startDate = new Date("2019-05-01");
        let endDate = new Date("2019-05-11");

        //filtros, propriedades para retorno
        return await NewsRepository.find({ active: true, hat : 'publish', publishDate: {$gt: startDate, $lt: endDate}}, 'title hat img publishDate'); 
    };

    async getById(_id){
        return await NewsRepository.findById(_id);

    };

    async create(news) {
        //console.log(news);
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