import React from "react";
import styles from "ImageGridItem.scss";

class ImageGridItem extends React.PureComponent {

	render () {

		var { data: image } = this.props;

		return (

			<div className={styles.imageGridItem}>
				<span className={styles.imageGridItem__id}>{image.id}</span>
				<div className={styles.imageGridItem__innerContainer}>
					<div className={styles.imageGridItem__imageContainer}>
						<img src={image.thumbnailUrl} alt={image.title} className={styles.imageGridItem__image} />
					</div>
					<div className={styles.imageGridItem__info}>
						<p>{image.title}</p>
						<p>
							<span className={styles.imageGridItem__info__label}>Album ID:</span> {image.albumId}
						</p>
					</div>
				</div>
			</div>

		);

	}

}

ImageGridItem.propTypes = {
	data: React.PropTypes.shape({
		albumId: React.PropTypes.number,
		id: React.PropTypes.number,
		title: React.PropTypes.string,
		url: React.PropTypes.string,
		thumbnailUrl: React.PropTypes.string,
	}),
};

export default ImageGridItem;
