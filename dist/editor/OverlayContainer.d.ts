import * as React from 'react';
export declare type OverlayContainerProps = {
    style: React.CSSProperties;
    children?: React.ReactNode;
};
export declare function OverlayContainer(props: {
    style?: React.CSSProperties;
    className?: string;
    children: any;
    onClose?: () => void;
}): JSX.Element;
