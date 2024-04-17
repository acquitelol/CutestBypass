import modules from '@core/modules';
import { mergeStyles, createStyleSheet, commonStyles } from '@core/stylesheet';

import { SectionBodyProps, SectionProps, SectionTitleProps } from '@azalea/components';

const { React } = modules.common;
const { merge } = createStyleSheet({
    body: {
        marginBottom: '1em',
        border: '2px solid var(--palette-blue-gradient-start)',
        boxShadow: 'var(--spx-shadow-md)',
        borderRadius: 20,
        overflow: 'hidden'
    },

    bodyWrapper: {
        overflow: 'hidden',
        transition: 'max-height 200ms ease, opacity 200ms ease'
    },

    arrow: {
        scale: '50%',
        marginRight: '0.25em',
        userSelect: 'none',
        transition: 'all 300ms ease'
    }
});

export function SectionTitle({ children }: SectionTitleProps) {
    return <h2>{children}</h2>;
}

export function SectionBody({ children, style }: SectionBodyProps) {
    return <div style={merge(x => [x.body, style ?? {}])}>
        {children}
    </div>;
}

export function Section({ title, children, collapsable = true, style }: SectionProps) {
    const [hidden, setHidden] = React.useState(false);
    
    return <div style={mergeStyles({ marginInline: '2em' }, style)}>
        <div 
            style={commonStyles.merge(x => [
                x.flex, x.row,
                { 
                    cursor: collapsable ? 'pointer' : 'auto',
                    userSelect: collapsable ? 'none' : 'auto',
                    width: 'fit-content'
                },
            ])}
            {...collapsable ? { onClick: () => setHidden(prev => !prev) } : {}}
        >
            {collapsable && <div 
                style={merge(x => [
                    x.arrow, 
                    { 
                        rotate: hidden ? '0deg' : '90deg',
                    }
                ])}
            >
                <h2>{'▶'}</h2>
            </div>}
            {title && <div>
                <SectionTitle>{title}</SectionTitle>
            </div>}
        </div>
        {children && <div 
            style={merge(x => [
                x.bodyWrapper,
                {
                    maxHeight: hidden ? '0' : '100%',
                    opacity: hidden ? '0' : '1',
                }
            ])}
        >
            <SectionBody>{children}</SectionBody>
        </div>}
    </div>;
}

export default { SectionTitle, SectionBody, Section };