import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('ststus from props should be in the state', () => {
        const component = create(<ProfileStatus status='lalala' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('lalala');
    });

    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status='lalala' />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBe(null);
    });

    test('after creation span should be displayed with correct status', () => {
        const component = create(<ProfileStatus status='lalala' />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('lalala');
    });

    test('after creation input should not be displayed', () => {
        const component = create(<ProfileStatus status='lalala' />);
        const root = component.root;
        expect(() => {
            root.findByType('input');
        }).toThrow();
    });

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='lalala' />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('lalala');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='lalala' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});