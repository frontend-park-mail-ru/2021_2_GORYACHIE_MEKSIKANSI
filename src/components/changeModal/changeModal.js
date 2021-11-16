import {Modal} from "hme-design-system/src/components/modal/modal";
import {Input} from "hme-design-system/src/forms/input/input";
import {ButtonGroup} from "hme-design-system/src/components/buttonGroup/buttonGroup";
import {Button} from "hme-design-system/src/components/button/button";


/**
 * Show modal menu with input to add menu
 */
export const ChangeInputModal = ({
  title = '',
                                 }) => {
    return new Modal({
        title: title,
        centerContent: [new Input({
          label: '',
          placeholder: 'Новое название раздела',
          border: true,
          borderRadius: 'high',
          type: 'text',
          classes: ['modal_input'],
        }).render()],
        bottomContent: [
          ButtonGroup({
            row: true,
            buttons: [new Button({
              label: 'Отмена',
              color: 'green',
              classes: ['modal_cancel'],
            }).render(),
              new Button({
                label: 'Принять',
                classes: ['modal_accept'],
              }).render(),]
          }),
        ],
      }
    ).render();
}