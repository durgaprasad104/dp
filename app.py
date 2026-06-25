import streamlit as st
from PIL import Image
import io

# Function to compress the image
def compress_image(image, target_size, unit, initial_quality=100):
    if unit == 'MB':
        target_size *= 1024  # Convert MB to KB

    quality = initial_quality
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=quality)
    buffer.seek(0)
    
    while buffer.getbuffer().nbytes / 1024 > target_size and quality > 10:
        quality -= 10
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=quality)
        buffer.seek(0)
    
    return buffer

# Function to resize the image
def resize_image(image, new_size):
    return image.resize(new_size, Image.ANTIALIAS)

# Streamlit app
st.title("Photo Size Compressor/Increaser")

# Upload image
uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_file:
    # Open the image
    image = Image.open(uploaded_file)
    
    # Display the original image
    st.image(image, caption='Uploaded Image', use_column_width=True)
    
    # Compression section
    st.subheader("Compress Image to Desired Size")
    size_unit = st.radio("Select size unit:", ("KB", "MB"))
    target_size = st.number_input(f"Enter desired size ({size_unit}):", min_value=0.0, value=1.0, step=0.1)
    
    if st.button("Compress Image"):
        compressed_image = compress_image(image, target_size, size_unit)
        st.image(compressed_image, caption='Compressed Image', use_column_width=True)
        st.download_button(
            label="Download Compressed Image",
            data=compressed_image,
            file_name="compressed_image.jpg",
            mime="image/jpeg"
        )
    
    # Resize section
    st.subheader("Resize Image")
    new_width = st.number_input("New width:", min_value=1, max_value=image.width, value=image.width)
    new_height = st.number_input("New height:", min_value=1, max_value=image.height, value=image.height)
    
    if st.button("Resize Image"):
        resized_image = resize_image(image, (new_width, new_height))
        st.image(resized_image, caption='Resized Image', use_column_width=True)
        buffered = io.BytesIO()
        resized_image.save(buffered, format="JPEG")
        st.download_button(
            label="Download Resized Image",
            data=buffered.getvalue(),
            file_name="resized_image.jpg",
            mime="image/jpeg"
        )
