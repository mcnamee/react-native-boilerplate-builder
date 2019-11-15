import moment from 'moment';
import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/articles';
import Config from '../constants/config';
import { getFeaturedImageUrl } from '../lib/images';
import { stripHtml } from '../lib/string';
import { errorMessages, successMessages } from '../constants/messages';

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = (item) => ({
  id: item.id || 0,
  name: item.title && item.title.rendered ? stripHtml(item.title.rendered) : '',
  content: item.content && item.content.rendered ? stripHtml(item.content.rendered) : '',
  excerpt: item.excerpt && item.excerpt.rendered ? stripHtml(item.excerpt.rendered) : '',
  date: moment(item.date).format(Config.dateFormat) || '',
  slug: item.slug || null,
  link: item.link || null,
  image: getFeaturedImageUrl(item),
});

export default {
  namespace: 'articles',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async fetchList({ forceSync = false, page = 1 } = {}, rootState) {
      const { articles = {} } = rootState;
      const { lastSync = {}, page: rootStatePage } = articles;

      // Only sync when it's been 5mins since last sync
      if (lastSync[page]) {
        if (!forceSync && moment().isBefore(moment(lastSync[page]).add(5, 'minutes'))) {
          return true;
        }
      }

      // We've reached the end of the list
      if (page - rootStatePage >= 2) {
        return true;
      }

      try {
        const data = await Api.get(`/v2/posts?per_page=4&page=${page}&orderby=modified&_embed`);
        return !data || data.length < 1 ? true : dispatch.articles.replace({ data, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a single item from the API
     * @param {number} id
     * @returns {Promise[obj]}
     */
    async fetchSingle(id) {
      try {
        const item = await Api.get(`/v2/posts/${id}?_embed`);

        if (!item) {
          throw new Error({ message: errorMessages.articles404 });
        }

        return transform(item);
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Save date to redux store
     * @param {obj} data
     * @returns {Promise[obj]}
     */
    async save(data) {
      try {
        if (Object.keys(data).length < 1) {
          throw new Error({ message: errorMessages.missingData });
        }

        dispatch.articles.replaceUserInput(data);
        return successMessages.defaultForm; // Message for the UI
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let list = null;
      const { data, page } = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        list = data.map((item) => transform(item));
      }

      return list
        ? {
          ...state,
          list: page === 1 ? list : [...state.list, ...list],
          lastSync:
              page === 1 ? { [page]: moment().format() } : { ...state.lastSync, [page]: moment().format() },
          page,
        }
        : initialState;
    },

    /**
     * Save form data
     * @param {obj} state
     * @param {obj} payload
     */
    replaceUserInput(state, payload) {
      return {
        ...state,
        userInput: payload,
      };
    },
  },
};