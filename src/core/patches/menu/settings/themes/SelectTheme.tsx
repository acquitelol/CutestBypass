import Theming from '@core/handlers/theming';
import { createStyleSheet } from '@stylesheet';
import { common } from '@core/modules';

import { SelectThemeProps } from '@azalea/themes';

const { React } = common;
const { styles } = createStyleSheet({
    selector: {
        borderRadius: '100em',
        height: 'var(--spx-unit-10)',
        width: 'auto',
        paddingRight: '2em',
        marginLeft: '0.5em',
        color: 'var(--palette-dark-blue)'
    }
});

function SelectTheme({ label, selected, setSelected }: SelectThemeProps) {
    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [selected]);

    return <select 
        value={selected}
        className='_AzaleaSelect'
        style={styles.selector}
        onChange={e => {
            const index = Number(e.target.value);
            setSelected(Theming.themes[index] ? index : 0);
        }}
    >
        {Theming.themes.map((theme, i) => (
            <option value={i} key={i}>
                {theme.name}
            </option>
        ))}
    </select>;
}

export default SelectTheme;