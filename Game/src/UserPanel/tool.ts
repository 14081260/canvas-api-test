class tool {
    public static anch(bitmap: engine.Bitmap) {
        bitmap.anchorOffsetX = bitmap.width / 2;
        bitmap.anchorOffsetY = bitmap.height / 2;
    }
    public static createBitmapByName(name: string): engine.Bitmap {
        var result = new engine.Bitmap();
        // var texture: engine.Texture = RES.getRes(name);
        // result.texture = texture;
        result.src ="name";
        return result;
    }
}