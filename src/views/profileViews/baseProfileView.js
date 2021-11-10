import {View} from '../baseView/View';

export class BaseProfileView extends View {
  constructor({
    parent = document.body,
    routeTo = () => {},
    controller,
  }) {
    super({
      parent, routeTo, controller,
    });
  }

  render(props = {}) {
    super.render(props);
    document.getElementById('app').style.backgroundColor = '#f6f6f6';
    console.log('HERE');
  }

  settingUp() {}

  remove() {
    super.remove();
    document.getElementById('app').style.backgroundColor = '';
  }
}
