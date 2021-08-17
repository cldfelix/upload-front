import '../assets/css/style.css';

// https://www.freecoursesonline.me/ultimate-courses-javascript-html5-apis/


const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1>
<div class="uploader">
<div id="item-0" class="dragme" draggable="true" ></div>
<input type="file" class="files" accept="image/*" multiple>
<div class="dropzone">taget </div>
<div class="list"></div>
</div>

<style>
.uploader{
  box-sizing: border-box;
  max-width: 90%;
  border-radius: 10px;
  border-bottom: 3px solid #d2d5da;
  margin: 25px auto;
  padding: 25px;
  background: #fff;
}

.dropzone{
  border-radius: 5px;
  margin-top: 25px;
  padding: 25px;
  border: 2px dashed #d2d5da;
  background: #f1f2f5;
}
.dragme{
    background: #c11f99;
    border-radius: 5px;
    width: 50px;
    height: 50px

}

.active{
    background: #ebfff6;
    border-color: #24b373;
}
</style>

`;


const init = () => {

    const dropzone = document.querySelector('.dropzone');
    const files = document.querySelector('.files');
    const dragme = document.querySelector('.dragme');
    const list = document.querySelector('.list');


    document.addEventListener('dragover', (e) => e.preventDefault())
    document.addEventListener('drop', (e) => e.preventDefault())

    files.addEventListener('change', (e) => {
        const { files } = e.target;
        console.log(files);
        handleUpload(files);
    })

    const listaParaExibir = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (e) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div style='display: flex;'>
            <img src="${e.target.result}"
                 alt="${file.name}"
                 style="width: 20px; margin-right: 10px;">
            <p>${file.name}<span>${file.size}bytes</span></p>
            
            </div>
            `;

            list.append(div);

        });
        console.log(reader);
        console.log(list, file);

    }
    const tiposPermitidos = (file) => {
        return ['image/png', 'image/jpeg'].includes(file.type);
    }

    const handleUpload = async (files) => {
        const filesParaUpload = [...files].filter(tiposPermitidos);
        filesParaUpload.forEach(listaParaExibir);
        const upados = await uploadFiles(filesParaUpload);
        if (upados) {
            for (const img of upados.images) {
                console.log(img);
            }
        }
    }

    const uploadFiles = async (files) => {
        const form = new FormData();
        [...files].forEach((file) => form.append(file.name, file));
        const request = await fetch("endpoint-to-upload", {
            method: 'post',
            body: form
        })


        return await request.json();

        // console.log([...form.entries()]);
    }

    dragme.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        console.log(e.dataTransfer);
        console.log(e.target.id);
    })

    dropzone.addEventListener('dragenter', (e) => {
        e.target.classList.add('active');
        // console.log(e, 'dragenter');
    })

    dropzone.addEventListener('dragleave', (e) => {
        e.target.classList.remove('active');

        // console.log(e, 'dragleave');
    })

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        // console.log(e, 'dragleave');0
    })

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('active');


        const id = e.dataTransfer.getData('text/plain');
        const elem = document.getElementById(id);
        dropzone.append(elem);
        const { files } = e.dataTransfer;
        handleUpload(files);
        // console.log(e.dataTransfer.files)
        // console.log(files);
    })

}

const init2 = () => {
    /*
    const permission = await Notification.requestPermission();
    switch (permission) {
        case 'granted': {
            console.log('granted')
            break;
        }
        case 'denied': {
            console.log('denied')
            break;
        }
        default: {
            console.log('Permissão ')
        }
    }
    */
    const notify = (titulo, body) => {
        if (Notification.permission === 'granted') {
            return new Notification(titulo, { body, icon: 'https://i.imgur.com/2Qs6HQp.png' })
        }

        return null;
    }

    const mostrarNotificacao = () => {
        const notification = notify('🔈 Now playing', 'Senhor Bucarest - Bacardi');

        if (notification) {
            notification.addEventListener('click', (e) => {
                window.parent.focus();
                e.target.close();
            })
        }
    }



    // setInterval(mostrarNotificacao, 2000);
    setTimeout(mostrarNotificacao, 2000);

}


console.log(window.localStorage.constructor === Storage);
console.log(window.sessionStorage.constructor === Storage);
console.log(typeof Storage === 'function');
console.log(!!(typeof Storage === 'function' && window.localStorage));
if (typeof Storage === 'function' && window.localStorage) {
    
}

const stor = ()=>{

}



/*
if('draggable' in document.createElement('div') ){
    init();
}

if ('Notification' in window) {
    init2();
}
*/

