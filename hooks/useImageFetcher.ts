import { PhotoIdentifier, Album, GetPhotosParams, CameraRoll, GetAlbumsParams } from '@react-native-camera-roll/camera-roll';
import { useCallback, useEffect, useState } from 'react';

const defaultParams: GetPhotosParams = {
    first: 10,

    assetType: 'Photos',
};

const useImageFetcher = () => {
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);

    const fetchPhotos = useCallback(async (params: GetPhotosParams) => {
        const res = await CameraRoll.getPhotos(params);
        setPhotos(res?.edges);
    }, []);

    useEffect(() => {
        if (!photos.length) {
            fetchPhotos(defaultParams);
        }
    }, [photos, fetchPhotos]);

    const fetchAlbums = useCallback(async (params: GetAlbumsParams) => {
        const res = await CameraRoll.getAlbums(params);
        console.log('res', res);
        setAlbums(res);
    }, []);

    useEffect(() => {
        if (!albums.length) {
            console.log('FETCHING ALBUMS');
            fetchAlbums({
                assetType: 'All',
                albumType: 'All',
            });
        }
    }, [albums, fetchAlbums]);

    return {
        albums,
        photos,
        fetchPhotos,
    };
};

export default useImageFetcher;
