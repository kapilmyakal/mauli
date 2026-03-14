import React from "react";
import styles from "./MauliVideos.module.scss";

type Props = {
  video1: string;
  video2: string;
  linkVideoId: string;
};

const MauliVideos: React.FC<Props> = ({ video1, video2, linkVideoId }) => {
  return (
    <div>
      <div className={styles.titleElegant}>
        <p>Mauli Napkin Bouquet Videos</p>
      </div>

      <div className={styles.videoview}>
        {/* First Video */}
        <div className={styles.videoItem}>
          <iframe
            src={`https://www.youtube.com/embed/${video1}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Anchor Image (YouTube Link) */}
        <div className={styles.videoItem}>
          <a
            href={`https://www.youtube.com/watch?v=${linkVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`https://img.youtube.com/vi/${linkVideoId}/hqdefault.jpg`}
              alt="Watch on YouTube"
              className={styles.thumbView}
            />
          </a>
        </div>

        {/* Second Video */}
        <div className={styles.videoItem}>
          <iframe
            src={`https://www.youtube.com/embed/${video2}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default MauliVideos;
