import modules from '@modules';

import { BaseButtonProps } from '@azalea/buttons';
import { mergeStyles } from '@core/stylesheet';

const { React } = modules.common;

export function BaseButton({ text, leading = null, trailing = null, className = '', onClick, ...props }: BaseButtonProps) {
    return <div
        className={className}
        onClick={onClick}
        {...props}
    >
        {leading}
        {text}
        {trailing && ' '}
        {trailing}
    </div>;
}

export function SolidButton({ style, ...props }: Arguments<typeof BaseButton>[0]) {
    return <BaseButton 
        {...props}
        style={mergeStyles({ userSelect: 'none' }, style ?? {})}
        className={'_AzaleaButton' + (props.className ?? '')}
    />;
}

export function DropdownButton(props: Arguments<typeof BaseButton>[0]) {
    return <BaseButton 
        {...props}
        leading={props.leading}
        className={'_AzaleaDropdown' + ' ' + (props.className ?? '')}
    />;
}