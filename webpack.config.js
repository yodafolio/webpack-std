// path 모듈 불러오기
const path = require('path');
// html 플러그인 불러오기 (html 빌더, html도 빌드될 수 있도록)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', //배포 전 작업용 자바스크립트 시작점
    output: {//최종 배포용 번들링 파일 설정
        // 최종 번들링된 자바스크립트
        filename: 'main.js',
        //dist를 배포용 폴더로 사용d
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html' // index.html을 기본 템플릿으로 반영할 수 있도록 설정
        }),
        new MiniCssExtractPlugin({
            filename: "common.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // use 배열은 뒤에서부터 적용된다.
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // file-loader 세팅
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: ['file-loader'],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 8080
    }
}

