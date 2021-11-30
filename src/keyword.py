import gensim
import sys

model = gensim.models.KeyedVectors.load_word2vec_format("/home/ubuntu/splace_proto_backend/splace-backend/src/ko.vec", binary=False)
result = model.most_similar(sys.argv[1])
print(result)