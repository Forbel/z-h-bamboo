const ADD = 'ADD', EDIT = 'EDIT', VIEW = 'VIEW';

export class PageStatus {
  status;
  statusMap = new Map([
    [ADD, ADD],
    [EDIT, EDIT],
    [VIEW, VIEW]
  ]);
  constructor(status = null) {
    this.status = status;
  }

  changeStatus(key) {
    if (!this.statusMap.has(key)) {
      throw new Error(`${key} is not a valid status`);
    }

    this.status = this.statusMap.get(key);
  }
  isStatus(key) {
    return this.status === this.statusMap.get(key);
  }
  fetchStatus(keyList) {
    return keyList.some((key) => this.isStatus(key));
  }

  get status() {
    return this.status;
  }
  get isAdd() {
    return this.isStatus(ADD);
  }
  get isEdit() {
    return this.isStatus(EDIT);
  }
  get isView() {
    return this.isStatus(VIEW);
  }
  get statusEnum() {
    return this.statusMap;
  }
}
