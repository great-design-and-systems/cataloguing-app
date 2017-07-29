import { BackButton, ResponsiveButton } from '../common/';
import { LABEL_ADD_SUBJECT, LABEL_BOOK_ADDITIONAL_INFO, LABEL_BOOK_COPIES, LABEL_BOOK_INFORMATION, LABEL_BOOK_SUBJECTS, LABEL_CANCEL, LABEL_SAVE } from '../../labels/';

import { BookAdditionalInformation } from './edit-page/BookAdditionalInformation';
import { BookCopies } from './edit-page/BookCopies';
import { BookInformation } from './edit-page/BookInformation';
import { ConnectSubjectsPage } from '../../containers/BookSubjectPage';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';

export const BookItemForm = ({ onChange, tabEventKey, onSelectTab, addSubject, managedBook, settings }) => {
    return (
        <form onChange={(event) => {
            event.preventDefault();
            onChange(event.target);
        }} className="form container-fluid">
            <div className="col-sm-12 form-group">
                <BackButton label={LABEL_CANCEL} />
                <ResponsiveButton className="btn btn-primary" icon={
                    <FontAwesome fixedWidth={true} name="floppy-o" />
                } label={LABEL_SAVE} />
                {tabEventKey === 'bookSubjects' &&
                    <ResponsiveButton onClick={addSubject} className="btn btn-success" icon={
                        <FontAwesome fixedWidth={true} name="plus-circle" />}
                        label={LABEL_ADD_SUBJECT} />}
            </div>
            <Tabs onSelect={onSelectTab} id="bookItemEditTabs" activeKey={tabEventKey} defaultActiveKey={'bookInfo'}>
                <Tab title={LABEL_BOOK_INFORMATION} eventKey={'bookInfo'}><BookInformation managedBook={managedBook} onChange={onChange} /></Tab>
                <Tab title={LABEL_BOOK_SUBJECTS} eventKey={'bookSubjects'}><ConnectSubjectsPage /></Tab>
                {managedBook.update && <Tab title={LABEL_BOOK_ADDITIONAL_INFO} eventKey={'bookAddInfo'}><BookAdditionalInformation managedBook={managedBook} settings={settings} /></Tab>}
                {managedBook.update && <Tab title={LABEL_BOOK_COPIES} eventKey={'bookCopies'}><BookCopies onChange={onChange} managedBook={managedBook} settings={settings} /></Tab>}
            </Tabs>
        </form>);
};

BookItemForm.propTypes = {
    managedBook: PropTypes.object.isRequired,
    onSelectTab: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    tabEventKey: PropTypes.string.isRequired,
    addSubject: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
};