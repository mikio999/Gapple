'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import CustomModal from '@/_component/Modal/CustomModal';
import ProfileForm from './ProfileForm';
import putProfile from '../../_lib/putProfile';

const UserInfo = () => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    image: '/images/gappler.png',
    experienceLevel: 'Lv.1 새싹 선생님',
    introduction: '교육의 가치를 믿습니다!',
  });
  const [imageId, setImageId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || '',
        image: session.user.image || '/images/gappler.png',
        experienceLevel: 'Lv.1 새싹 선생님',
        introduction: '교육의 가치를 믿습니다!',
      });
    }
  }, [session]);

  const openModal = () => {
    if (session?.user) {
      setProfileData({
        name: session?.user?.name,
        image: session.user.image || '/images/gappler.png',
        experienceLevel: profileData.experienceLevel,
        introduction: profileData.introduction,
      });
      setModalIsOpen(true);
    } else {
      console.error('Session data is not yet available.');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageSrc) => {
    setProfileData((prev) => ({ ...prev, image: imageSrc }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await putProfile(
        {
          nickname: profileData.name,
          selfIntro: profileData.introduction,
          image_file_id: imageId,
        },
        session.accessToken,
      );
      console.log(response);
      toast.success('프로필 업데이트에 성공했습니다!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('프로필 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (status === 'loading') {
    return (
      <div className={'flex justify-center items-center mt-64'}>
        <GridLoader color={'#ED4264'} size={15} />
      </div>
    );
  }

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div
      className={
        'flex laptop:flex-row laptop:justify-around laptop:h-48 flex-col items-center space-y-4 bg-white px-8 rounded-lg pb-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out'
      }
    >
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <Image
          src={profileData.image || '/images/gappler.png'}
          alt={'Profile'}
          layout={'fill'}
          className={'rounded-full object-cover'}
        />
      </div>
      <div className={'flex flex-col laptop:ml-8'}>
        <h1 className={'text-xl font-semibold text-slate-800'}>
          {profileData.name}
        </h1>
        <div className={'text-sm text-slate-500'}>
          {profileData.experienceLevel}
        </div>
        <div className={'text-sm text-slate-600 mt-2'}>
          {profileData.introduction}
        </div>
        <button
          type={'button'}
          className={
            'mt-2 w-20 py-1 bg-slate-700 hover:bg-slate-500 text-white font-medium rounded-md text-xs'
          }
          onClick={openModal}
        >
          {'프로필 수정'}
        </button>
      </div>
      {modalIsOpen && (
        <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
          <ProfileForm
            profileData={profileData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleSetImageId={setImageId}
            accessToken={session.accessToken}
            loading={loading}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default UserInfo;
