// @flow
import React from 'react';
import classNames from 'classnames';
import textAreaStyles from './textArea.scss';

type Props = {|
    name?: string,
    onBlur?: () => void,
    onChange: (string) => void,
    placeholder?: string,
    valid: boolean,
    value: ?string,
|};

export default class TextArea extends React.PureComponent<Props> {
    static defaultProps = {
        valid: true,
    };

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        this.props.onChange(event.currentTarget.value);
    };

    handleBlur = () => {
        const {onBlur} = this.props;

        if (onBlur) {
            onBlur();
        }
    };

    render() {
        const {
            name,
            placeholder,
            value,
            valid,
        } = this.props;

        const textareaClass = classNames(
            textAreaStyles.textArea,
            {
                [textAreaStyles.error]: !valid,
            }
        );

        return (
            <textarea
                name={name}
                className={textareaClass}
                value={value || ''}
                placeholder={placeholder}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
            />
        );
    }
}
