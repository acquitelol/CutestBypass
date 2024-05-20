import Settings from './Settings';
import utilities from '@core/utilities';
import { common } from '@modules';

import { MenuItem, RouteItem } from '@azalea/types';
import components from '@core/components';

const { React } = common;
const { navigate } = utilities;

export const path = '/azalea/settings';

class Item implements MenuItem {
    text = 'Settings';
    leading = <components.SettingsIcon />;

    callback() {
        navigate(path);
    }
}

class Route implements RouteItem {
    path = path;

    component() {
        return <Settings />;
    }
}

export default { Item, Route };