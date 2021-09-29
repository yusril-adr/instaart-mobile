import CONFIG from '../global/config';
import MMKVwithEncryption from "./MMKVwithEncryption";

const History = {
  async getHistory() {
    const data = (await MMKVwithEncryption.getStringAsync(CONFIG.HISTORY_KEY)) || null;

    const history = JSON.parse(data) || [];
    return history.reverse();
  },

  async newHistory(keyword) {
    const histories = await this.getHistory();

    if (histories.includes(keyword) || keyword.trim() === '') return;

    const newHistory = [
      ...histories.reverse(),
      keyword
    ].slice(-4);
    await MMKVwithEncryption.setStringAsync(CONFIG.HISTORY_KEY, JSON.stringify(newHistory));
  }
}

export default History;