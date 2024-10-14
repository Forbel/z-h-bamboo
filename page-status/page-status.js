export class PageStatus {
  status;
  statusMap = new Map([['add', 'ADD'], ['edit', 'EDIT'], ['view', 'VIEW']])
  constructor (status = null) {
      this.status = status;
  }

  changeStatus (key) {
      if (!this.statusMap.has(key)) {
          throw new Error(`${key}不存在于页面类型中`);
      }

      this.status = this.statusMap.get(key);
  }
  isStatus (key) {
      return this.status === this.statusMap.get(key);
  }
  fetchStatus (keyList) {
      return keyList.some(key => this.isStatus(key));
  }

  get status () {
      return this.status;
  }
  get isAdd () {
      return this.isStatus('add');
  }
  get isEdit () {
      return this.isStatus('edit');
  }
  get isView () {
      return this.isStatus('view');
  }
  get statusEnum () {
      return this.statusMap;
  }
}