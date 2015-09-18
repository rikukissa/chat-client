import axios from 'axios';

const cache = {};

export function getEmbed(id) {

  cache[id] = cache[id] || axios.get('https://api.imgur.com/3/gallery/' + id);

  return cache[id].then((res) => {
    if(res.data.data.is_album) {
      return `<iframe class="imgur-album" width="100%" height="550" frameborder="0" src="https://imgur.com/a/${id}/embed"></iframe>`;
    }
    return res.data.data.link;
  });

}
