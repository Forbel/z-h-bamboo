const ADD = 'ADD', EDIT = 'EDIT', CHECK = 'CHECK';
const StatusMap = [
    [ADD, ADD],
    [EDIT, EDIT],
    [CHECK, CHECK]
]

export class PageStatus {
  status;
  statusMap;
  constructor(status = null) {
    this.status = status;
    this.statusMap = new Map(StatusMap)
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
  get isCheck() {
    return this.isStatus(CHECK);
  }
  get statusEnum() {
    return this.statusMap;
  }
}
