import Bookwork from './Bookwork';
import utilities from '@core/utilities';
import { common } from '@modules';

import { MenuItem, RouteItem } from '@azalea/types';
import components from '@core/components';

const { React } = common;
const { navigate } = utilities;

export const path = '/azalea/bookwork';

class Item implements MenuItem {
    text = 'Bookwork';
    leading = <components.BookIcon />;

    callback() {
        navigate(path);
    }
}

class Route implements RouteItem {
    path = path;

    component() {
        return <Bookwork />;
    }
}

export default { Item, Route };