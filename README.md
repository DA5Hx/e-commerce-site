## Delete Images from cloud

```js
let imagesDelete;
if (req.files) {
	imagesDelete = req.files.filter(
		(file) =>
			product.imagesPath.indexOf({
				url: file.path,
				public_id: file.filename,
			}) === -1
	);
} else {
	imagesDelete =
		product.imagesPath.indexOf({
			url: req.file.path,
			public_id: req.file.filename,
		}) === -1
			? [{ url: file.path, public_id: file.filename }]
			: [];
}
console.log(
	req.files.some((item) => {
		console.log(item.filename);
		item.filename === product.imagesPath.public_id;
	})
);
const deleteImages = req.files
	? product.imagesPath
			.filter((file) =>
				req.files.find((item) => item.filename === file.public_id)
			)
			.map((file) => file.filename)
	: product.imagesPath.indexOf({
			url: req.file.path,
			public_id: req.file.filename,
	  }) === -1
	? [reqp.file.public_id]
	: [];
console.log(deleteImages);
```
