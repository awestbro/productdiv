import * as React from 'react';
import classnames from 'classnames';

export type OverlayContainerProps = {
    style: React.CSSProperties,
    children?: React.ReactNode,
}

export function OverlayContainer(props: { style?: React.CSSProperties, className?: string, children: any, onClose?: () => void }) {
    const { onClose, style = {} } = props;
    return (
        <div data-productdiv-ignore="true" style={{ ...props.style }} className={classnames(props.className, 'productdiv-overlay', 'productdiv-overlay-floating')}>
            {onClose ? <button type="button" className="btn btn-sm btn-outline-light float-end" onClick={onClose}>x</button> : null}
            {props.children}
        </div>
    );
}