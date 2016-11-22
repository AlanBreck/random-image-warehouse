import React from "react";
import fetchImages from "fetchImages";
import throttle from "lodash/throttle";
import Loader from "Loader";
import ImageGridItem from "ImageGridItem";

import styles from "ImageGrid.scss";

export default class ImageGrid extends React.Component {

	constructor ( props ) {

		super( props );

		this.state = {
			images: [],
			sortColumn: "id",
			currentPage: 1,
			noMoreData: false,
			isLoading: false,
		}

	}

	componentDidMount () {

		this.setState({ isLoading: true });
		fetchImages( this.state.sortColumn, this.state.currentPage, ( images ) => {
			this.setState({
				images: images,
				isLoading: false
			});
		});

		window.addEventListener( "scroll", throttle( this.handleScroll, 300 ).bind( this ) );

	}

	componentWillUnmount () {

		window.removeEventListener( "scroll", throttle( this.handleScroll, 300 ).bind( this ) );

	}

	sortImages ( e ) {

		var sortColumn = e.target.getAttribute( "data-columnName" );

		this.setState({
			images: [],
			isLoading: true,
			sortColumn: sortColumn
		});
		fetchImages( sortColumn, 1, ( images ) => {
			this.setState({ images: images, isLoading: false });
		});

	}

	loadMoreImages () {

		var { images, sortColumn, currentPage } = this.state;
		var nextPage = currentPage + 1;

		this.setState({ isLoading: true });
		fetchImages( sortColumn, nextPage, ( newImages, endReached ) => {
			this.setState({
				images: images.concat( newImages ),
				currentPage: nextPage,
				noMoreData: endReached,
				isLoading: false
			});
		});

	}

	handleScroll () {

		var { isLoading, noMoreData } = this.state;

		if ( !isLoading && !noMoreData ) {
			var windowHeight = window.innerHeight;
			var imageGridRect = this.refs.imageGrid.getBoundingClientRect();

			var windowAndContainerDif = imageGridRect.bottom - windowHeight;

			if ( windowAndContainerDif <= 500 ) this.loadMoreImages();
		}

	}

	render () {

		var { isLoading, noMoreData, sortColumn, images } = this.state;

		return (

			<div>
				<div className={styles.sortImages}>
					<span className={styles.sortImages__label}>Sort Images:</span>
					<ul className={styles.sortImages__buttons}>
						{["id", "title", "albumId"].map(( columnName, i ) => {

							var className = ( sortColumn === columnName ) ? "sortImages__button--active" : "sortImages__button";

							return (
								<li
									className={styles[className]}
									key={i}
									data-columnName={columnName}
									onClick={this.sortImages.bind( this )}>
									{columnName}
								</li>
							);

						})}
					</ul>
				</div>
				<div className={styles.imageGrid} ref="imageGrid">
					{images.map(( image, i ) => {
						return <ImageGridItem data={image} key={i} />;
					})}
				</div>
				{isLoading && <Loader />}
				{noMoreData && <div className={styles.dialogBox}>~ end of catalogue ~</div>}
			</div>

		);

	}

}
