import * as LOADER from "three/examples/jsm/loaders/GLTFLoader.js";

export class ModelsLoader {

    #dracoLoaderPath = "../../node_modules/three/examples/jsm/libs/draco/";
    
    /**
     * Loading GLTF asset
     * @param {string} assetName Name of the GLTF asset file to load (no extension).  
     * NB: Path is set by default to: /assets/models/
     */
    constructor(assetPath) {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(dracoLoaderPath);
        loader.setDRACOLoader( dracoLoader );

        loader.load(
            `../../assets/models/${assetPath}.gltf`,
            
        )
    }

}