const metaData = (file) => {
    let file = e.target.files[0];
    console.log(file);
    let fs = new FileReader()
    fs.onload = () => {
        this.setState({ audioSrc: fs.result })
    }
    fs.readAsDataURL(file);
    jsmediatags.read(file, {
        onSuccess: tag => {
            console.log(tag.tags);
            const picture = tag.tags.picture;
            if (picture) {
                let base64String = "";
                for (let i = 0; i < picture.data.length; i++) {
                    base64String += String.fromCharCode(picture.data[i])
                }
                let imageSrc = "data:" + picture.format + ";base64," + window.btoa(base64String);
                this.setState({ imageSrc })
            } else {
                this.setState({ imageSrc: null })
            }
        },
        onError: function (error) {
            console.log(':(', error.type, error.info);
        }
    });
}



let file = e.target.files[0];
    console.log('file',file.size/(1024*1024));
    let fs = new FileReader()
    fs.onload = () => {
      console.log(fs.result.length/(1024*1024))
      console.log(fs.result)
      this.setState({audioSrc:fs.result})
      function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        //Old Code
        //write the ArrayBuffer to a blob, and you're done
        //var bb = new BlobBuilder();
        //bb.append(ab);
        //return bb.getBlob(mimeString);
    
        //New Code
        return new Blob([ab], {type: mimeString});
    
    
    }
    jsmediatags.read(dataURItoBlob(fs.result), {
      onSuccess: tag => {
          console.log(tag.tags);
          const picture = tag.tags.picture;
          if (picture) {
              let base64String = "";
              for (let i = 0; i < picture.data.length; i++) {
                  base64String += String.fromCharCode(picture.data[i])
              }
              let imageSrc = "data:" + picture.format + ";base64," + window.btoa(base64String);
              this.setState({ imageSrc })
          } else {
              this.setState({ imageSrc: null })
          }
      },
      onError: function (error) {
          console.log(':(', error.type, error.info);
      }
  });
    }
    fs.readAsDataURL(file)