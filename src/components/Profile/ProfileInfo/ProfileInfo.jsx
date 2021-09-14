import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import profilePic from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoChange = (e) => {
        if (e.target.files.length > 0) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <div>
            <div className={s.descr}>
                {props.profile.photos.large ? 
                    <img className={s.profilePic} src={props.profile.photos.large} alt='profile pic'/> : 
                    <img className={s.profilePic} src={profilePic} alt='profile pic'/>
                }                
                {
                    props.isOwner && <div className={s.changeProfilePic}>
                        <input type='file' onChange={onMainPhotoChange}/>
                    </div>
                }
                {editMode ? 
                <ProfileDataForm initialValues={props.profile} 
                                 profile={props.profile}
                                 status={props.status} 
                                 updateStatus={props.updateStatus}
                                 onSubmit={onSubmit} /> :
                <ProfileData profile={props.profile} 
                             status={props.status} 
                             updateStatus={props.updateStatus}
                             isOwner={props.isOwner} 
                             goToEditMode={() => {setEditMode(true)}} />
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>            
        </div>
    )
}

const ProfileData = ({profile, ...props}) => {
    return (
        <div>
            {props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>            
            <div>
                <b>Looking for a job: </b>{profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJobDescription &&
                <div>
                    <b>My professional skills: </b>{profile.lookingForAJobDescription}
                </div>
            }
            {profile.aboutMe && 
                <div>
                    <b>About me:</b>{profile.aboutMe}
                </div>
            }                
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                    return (profile.contacts[key] && <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />)
                })}
            </div>
        </div>
    )
};

export const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            {contactTitle}: {contactValue}
        </div>
    )
};

export default ProfileInfo;